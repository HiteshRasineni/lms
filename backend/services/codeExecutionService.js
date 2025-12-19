import codeArenaService from './codeArenaService.js';

/**
 * Execute code against multiple test cases
 * This service runs user code against problem test cases using CodeArena
 */
class CodeExecutionService {
    /**
     * Execute code against all test cases for a problem
     * @param {string} code - User's code
     * @param {string} language - Programming language
     * @param {Array} testCases - Array of test cases with input and expectedOutput
     * @param {string} userId - User ID for rate limiting
     * @returns {Object} Execution results
     */
    async executeCodeWithTestCases(code, language, testCases, userId) {
        try {
            const results = [];
            let passedCount = 0;
            let totalExecutionTime = 0;
            let totalMemoryUsed = 0;

            // Execute code against each test case
            for (let i = 0; i < testCases.length; i++) {
                const testCase = testCases[i];
                
                try {
                    // Submit code with test case input
                    const submission = await codeArenaService.submitCode(
                        code,
                        language,
                        testCase.input,
                        userId
                    );

                    // Poll for result with timeout
                    const result = await this.pollForResult(submission.token, 30);

                    // Check if output matches expected
                    const actualOutput = this.cleanOutput(result.stdout);
                    const expectedOutput = this.cleanOutput(testCase.expectedOutput);
                    const passed = this.compareOutputs(actualOutput, expectedOutput);

                    if (passed) {
                        passedCount++;
                    }

                    results.push({
                        testCaseId: testCase._id,
                        passed,
                        input: testCase.input,
                        expectedOutput: testCase.expectedOutput,
                        actualOutput: actualOutput,
                        executionTime: result.time || 0,
                        memoryUsed: result.memory || 0,
                        error: result.stderr || result.compile_output || null,
                        status: result.status
                    });

                    totalExecutionTime += result.time || 0;
                    totalMemoryUsed += result.memory || 0;

                    // If compilation error or runtime error, stop testing
                    if (result.status.includes('Error')) {
                        // Mark remaining test cases as not executed
                        for (let j = i + 1; j < testCases.length; j++) {
                            results.push({
                                testCaseId: testCases[j]._id,
                                passed: false,
                                input: testCases[j].input,
                                expectedOutput: testCases[j].expectedOutput,
                                actualOutput: '',
                                executionTime: 0,
                                memoryUsed: 0,
                                error: 'Not executed due to previous error',
                                status: 'Skipped'
                            });
                        }
                        break;
                    }

                } catch (error) {
                    console.error(`Error executing test case ${i}:`, error);
                    results.push({
                        testCaseId: testCase._id,
                        passed: false,
                        input: testCase.input,
                        expectedOutput: testCase.expectedOutput,
                        actualOutput: '',
                        executionTime: 0,
                        memoryUsed: 0,
                        error: error.message,
                        status: 'Execution Error'
                    });
                }

                // Small delay between test case executions to avoid rate limiting
                await this.sleep(500);
            }

            // Determine overall status
            const status = this.determineStatus(passedCount, testCases.length, results);

            return {
                status,
                testResults: results,
                passedTestCases: passedCount,
                totalTestCases: testCases.length,
                executionTime: testCases.length > 0 ? totalExecutionTime / testCases.length : 0,
                memoryUsed: testCases.length > 0 ? totalMemoryUsed / testCases.length : 0,
                error: null
            };

        } catch (error) {
            console.error('Code execution service error:', error);
            throw error;
        }
    }

    /**
     * Poll for execution result with timeout
     */
    async pollForResult(token, maxAttempts = 30) {
        let attempts = 0;
        const pollInterval = 1000; // 1 second

        while (attempts < maxAttempts) {
            await this.sleep(pollInterval);

            const result = await codeArenaService.getResult(token);

            if (!result.isProcessing) {
                return result;
            }

            attempts++;
        }

        throw new Error('Execution timeout - result not ready after 30 seconds');
    }

    /**
     * Clean and normalize output for comparison
     */
    cleanOutput(output) {
        if (!output) return '';
        return output
            .toString()
            .trim()
            .replace(/\r\n/g, '\n')
            .replace(/\s+$/gm, ''); // Remove trailing whitespace from each line
    }

    /**
     * Compare actual output with expected output
     */
    compareOutputs(actual, expected) {
        // Normalize both outputs
        const normalizedActual = this.cleanOutput(actual);
        const normalizedExpected = this.cleanOutput(expected);

        // Try exact match first
        if (normalizedActual === normalizedExpected) {
            return true;
        }

        // Try parsing as JSON for array/object comparison
        try {
            const actualJson = JSON.parse(normalizedActual);
            const expectedJson = JSON.parse(normalizedExpected);
            return JSON.stringify(actualJson) === JSON.stringify(expectedJson);
        } catch (e) {
            // Not JSON, continue with other comparisons
        }

        // Try numeric comparison (for floating point)
        const actualNum = parseFloat(normalizedActual);
        const expectedNum = parseFloat(normalizedExpected);
        if (!isNaN(actualNum) && !isNaN(expectedNum)) {
            return Math.abs(actualNum - expectedNum) < 0.0001;
        }

        // Try boolean comparison
        if (normalizedActual.toLowerCase() === normalizedExpected.toLowerCase()) {
            return true;
        }

        return false;
    }

    /**
     * Determine overall submission status
     */
    determineStatus(passedCount, totalCount, results) {
        // Check for compilation or runtime errors
        const hasCompilationError = results.some(r => 
            r.status && r.status.includes('Compilation Error')
        );
        if (hasCompilationError) {
            return 'Compilation Error';
        }

        const hasRuntimeError = results.some(r => 
            r.status && r.status.includes('Runtime Error')
        );
        if (hasRuntimeError) {
            return 'Runtime Error';
        }

        const hasTimeLimitExceeded = results.some(r => 
            r.status && r.status.includes('Time Limit Exceeded')
        );
        if (hasTimeLimitExceeded) {
            return 'Time Limit Exceeded';
        }

        const hasMemoryLimitExceeded = results.some(r => 
            r.status && r.status.includes('Memory Limit Exceeded')
        );
        if (hasMemoryLimitExceeded) {
            return 'Memory Limit Exceeded';
        }

        // All test cases passed
        if (passedCount === totalCount) {
            return 'Accepted';
        }

        // Some test cases failed
        return 'Wrong Answer';
    }

    /**
     * Sleep utility
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default new CodeExecutionService();
