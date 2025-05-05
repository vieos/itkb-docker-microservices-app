# Use official PHP image with FPM
FROM php:8.1-fpm

# Set working directory
WORKDIR /var/www

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy existing application directory contents
COPY . /var/www

# Set permissions to apache user and group, fallback to www-data if apache user does not exist
RUN if id apache >/dev/null 2>&1; then chown -R apache:apache /var/www; else chown -R www-data:www-data /var/www; fi && chmod -R 755 /var/www

# Clear Laravel caches and compiled files before install
RUN rm -rf bootstrap/cache/* || true

# Clear Laravel caches and compiled files before install
RUN php artisan config:clear || true && \
    php artisan cache:clear || true && \
    php artisan route:clear || true && \
    php artisan view:clear || true

# Clear composer cache
RUN composer clear-cache

# Install PHP dependencies without dev packages and optimize autoloader
RUN composer install --no-dev --optimize-autoloader

# Clear Laravel caches after install
RUN php artisan config:cache || true

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
