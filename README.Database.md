# Database Setup Guide

This guide explains how to set up and manage the database for the Mino Skincare e-commerce application.

## Prerequisites

- PostgreSQL database (version 12 or later)
- Node.js and npm/pnpm installed

## Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and configure your database connection:
```
DATABASE_URL="postgresql://username:password@localhost:5432/mino_skincare?schema=public"
```

Replace with your actual PostgreSQL credentials:
- `username`: your PostgreSQL username (default: postgres)
- `password`: your PostgreSQL password
- `localhost:5432`: your PostgreSQL host and port
- `mino_skincare`: your database name (create this database first)

3. **IMPORTANT**: Create the database in PostgreSQL first:
```sql
-- Connect to PostgreSQL as superuser
psql -U postgres

-- Create the database
CREATE DATABASE mino_skincare;

-- Grant permissions (optional, adjust as needed)
GRANT ALL PRIVILEGES ON DATABASE mino_skincare TO your_username;
```

## Database Commands

### Initialize Database
```bash
# Generate Prisma client
pnpm run db:generate

# Push schema to database (first time setup)
pnpm run db:push

# Seed with sample data
pnpm run db:seed
```

### Development Workflow
```bash
# After schema changes, push changes
pnpm run db:push

# Regenerate client after schema changes
pnpm run db:generate

# View database in browser
pnpm run db:studio
```

### Reset Database (Development Only)
```bash
# Reset and re-seed database
pnpm run db:reset
pnpm run db:seed
```

## Database Schema Overview

### Core Models
- **User**: Customer and admin accounts with addresses
- **Product**: Cosmetic products with detailed specifications (skin type, ingredients, etc.) - ALL from Mino Skincare brand
- **Category**: Product categories (Soins du visage, Maquillage, Soins capillaires, etc.)
- **Brand**: Single brand "Mino Skincare" (French natural cosmetics)
- **Order**: Customer orders with status tracking
- **OrderItem**: Individual items in orders
- **Payment**: Payment records with multiple methods
- **Shipment**: Shipping information and tracking
- **Review**: Product reviews and ratings
- **CartItem**: Shopping cart items
- **Address**: Billing and shipping addresses

### Key Features
- Single brand e-commerce (Mino Skincare)
- Showcase + e-commerce mixed site
- Product promotions and featured items
- User authentication and roles (Customer/Admin)
- Product inventory management with stock tracking
- Order processing with comprehensive status tracking
- Multiple payment methods support
- Shipping management with carrier tracking
- Customer reviews and ratings system
- Shopping cart functionality
- Address management for billing/shipping

## Sample Data

The seed script creates:
- 3 categories (Soins du visage, Maquillage, Soins capillaires)
- 1 brand (Mino Skincare)
- 4 products with French descriptions and ingredients
- 1 test user with French address
- Sample reviews

## Quick Setup (One Command)

For new projects, after configuring `.env` and creating the database:
```bash
pnpm run db:push && pnpm run db:seed
```

This will set up the complete database with sample data for development.

## Troubleshooting

- **Database does not exist**: Make sure to create the database in PostgreSQL first (see step 3 above)
- **Connection refused**: Check PostgreSQL is running and credentials are correct
- **Permission denied**: Ensure your PostgreSQL user has permissions on the database