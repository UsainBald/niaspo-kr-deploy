
FROM gradle:8.2-jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle bootJar --no-daemon --console=plain

FROM amazoncorretto:17-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
