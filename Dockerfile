# Use official lightweight Nginx image
FROM nginx:alpine


COPY source/ /usr/share/nginx/html

# Expose port 80 (default for HTTP)
EXPOSE 80

# Start Nginx automatically
CMD ["nginx", "-g", "daemon off;"]
