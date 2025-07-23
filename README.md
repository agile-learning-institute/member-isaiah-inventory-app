# member-isaiah-inventory-app

## PostgreSQL Setup with pgAdmin

1. **Create a PostgreSQL database and user in pgAdmin.**
   - Database name: e.g., `inventory_db`
   - User: e.g., `inventory_user`
   - Password: your chosen password

2. **Copy `.env.example` to `.env` and fill in your credentials:**
   ```sh
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Install dependencies:**
   ```sh
   npm install
   ```

4. **Run the app:**
   ```sh
   node app.js
   ```

5. **Troubleshooting:**
   - Ensure PostgreSQL is running and accessible.
   - Check your credentials in `.env`.
   - Use pgAdmin to verify your database and user setup.