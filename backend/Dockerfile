# ===== BUILD STAGE =====
FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /app

# Copy Maven descriptor first (for dependency caching)
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw mvnw

# Download dependencies (for faster rebuilds)
RUN mvn -B -ntp dependency:go-offline

# Copy source and build the jar
COPY src ./src
RUN mvn -B -ntp clean package -DskipTests

# ===== RUNTIME STAGE =====
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
