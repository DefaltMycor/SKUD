package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "com.example.demo")
public class ApplicationConfig {

    @Value("${com.example.demo.test-prop}")
    private String testProp;

    public String getTestProp() {
        return testProp;
    }

    public void setTestProp(String testProp) {
        this.testProp = testProp;
    }
}
