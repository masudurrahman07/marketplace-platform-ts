#!/bin/bash

# Quick Setup Script for Marketplace Project
# Run this once to set everything up

echo "🚀 Starting Marketplace Project Setup..."
echo ""

# Step 1: Frontend Dependencies
echo "📦 Installing Frontend Dependencies..."
npm install --silent
echo "✅ Frontend dependencies installed"
echo ""

# Step 2: Backend Dependencies
echo "📦 Installing Backend Dependencies..."
cd backend
npm install --silent
cd ..
echo "✅ Backend dependencies installed"
echo ""

echo "=================================================="
echo "✅ SETUP COMPLETE!"
echo "=================================================="
echo ""
echo "🎯 To run the project, open TWO terminals:"
echo ""
echo "Terminal 1 - FRONTEND (Port 3000):"
echo "   npm run dev"
echo ""
echo "Terminal 2 - BACKEND (Port 5000):"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "📖 For troubleshooting, read: TROUBLESHOOTING.md"
echo ""
