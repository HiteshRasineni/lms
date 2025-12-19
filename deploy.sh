#!/bin/bash

# Deployment script for LMS application
# This script helps deploy to Render and Vercel

set -e

echo "🚀 LMS Deployment Script"
echo "========================"

# Check if required tools are installed
check_dependencies() {
    echo "📋 Checking dependencies..."
    
    if ! command -v git &> /dev/null; then
        echo "❌ Git is required but not installed."
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is required but not installed."
        exit 1
    fi
    
    echo "✅ Dependencies check passed"
}

# Validate environment files
validate_env() {
    echo "🔍 Validating environment configuration..."
    
    if [ ! -f "backend/.env" ]; then
        echo "⚠️  backend/.env not found. Creating template..."
        cat > backend/.env << EOF
NODE_ENV=production
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
EMAIL_USER=your-email
EMAIL_PASS=your-email-password
FRONTEND_URL=your-frontend-url
EOF
        echo "📝 Please update backend/.env with your actual values"
    fi
    
    if [ ! -f "frontend/.env" ]; then
        echo "⚠️  frontend/.env not found. Creating template..."
        cat > frontend/.env << EOF
VITE_API_URL=your-backend-api-url
EOF
        echo "📝 Please update frontend/.env with your actual values"
    fi
}

# Test build locally
test_build() {
    echo "🧪 Testing local builds..."
    
    # Test backend
    echo "Testing backend build..."
    cd backend
    npm install
    echo "✅ Backend dependencies installed"
    cd ..
    
    # Test frontend
    echo "Testing frontend build..."
    cd frontend
    npm install
    npm run build
    echo "✅ Frontend build successful"
    cd ..
}

# Deploy to Render
deploy_render() {
    echo "🌐 Deploying to Render..."
    echo "1. Push your code to GitHub"
    echo "2. Go to https://dashboard.render.com"
    echo "3. Click 'New +' → 'Blueprint'"
    echo "4. Connect your GitHub repository"
    echo "5. Render will detect render.yaml and deploy automatically"
    echo ""
    echo "📋 Don't forget to set these environment variables in Render:"
    echo "   - CLOUDINARY_CLOUD_NAME"
    echo "   - CLOUDINARY_API_KEY" 
    echo "   - CLOUDINARY_API_SECRET"
    echo "   - GOOGLE_CLIENT_ID"
    echo "   - GOOGLE_CLIENT_SECRET"
    echo "   - EMAIL_USER"
    echo "   - EMAIL_PASS"
    echo "   - FRONTEND_URL (add after Vercel deployment)"
}

# Deploy to Vercel
deploy_vercel() {
    echo "⚡ Deploying to Vercel..."
    
    if command -v vercel &> /dev/null; then
        echo "Using Vercel CLI..."
        vercel --prod
    else
        echo "Vercel CLI not found. Manual deployment:"
        echo "1. Go to https://vercel.com/new"
        echo "2. Import your GitHub repository"
        echo "3. Set Framework Preset: Vite"
        echo "4. Set Build Command: cd frontend && npm install && npm run build"
        echo "5. Set Output Directory: frontend/dist"
        echo "6. Add environment variable: VITE_API_URL"
        echo "7. Deploy"
    fi
}

# Main deployment flow
main() {
    echo "Select deployment option:"
    echo "1. Full deployment (Render + Vercel)"
    echo "2. Render only"
    echo "3. Vercel only"
    echo "4. Test builds only"
    echo "5. Setup environment files"
    
    read -p "Enter your choice (1-5): " choice
    
    case $choice in
        1)
            check_dependencies
            validate_env
            test_build
            deploy_render
            deploy_vercel
            ;;
        2)
            check_dependencies
            validate_env
            deploy_render
            ;;
        3)
            check_dependencies
            validate_env
            deploy_vercel
            ;;
        4)
            check_dependencies
            test_build
            ;;
        5)
            validate_env
            ;;
        *)
            echo "Invalid choice. Exiting."
            exit 1
            ;;
    esac
    
    echo ""
    echo "🎉 Deployment process completed!"
    echo "📖 Check DEPLOYMENT.md for detailed instructions"
}

# Run main function
main