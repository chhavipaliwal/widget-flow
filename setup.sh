#!/bin/bash

# check if node is installed
if ! command -v node &> /dev/null; then
    echo "Node is not installed"
    exit 1
fi

# install pnpm if not installed
if ! command -v pnpm &> /dev/null; then
    npm install -g pnpm
fi

# install dependencies
pnpm install

# start the development server
pnpm dev