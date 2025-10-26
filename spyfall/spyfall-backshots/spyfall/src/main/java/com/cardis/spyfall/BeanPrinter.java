package com.cardis.spyfall;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
//uncomment for beans
//@Component
public class BeanPrinter implements ApplicationRunner {

    private final ApplicationContext applicationContext;

    public BeanPrinter(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Get all bean names from the application context
        String[] beanNames = applicationContext.getBeanDefinitionNames();
        
        // Print each bean name
        System.out.println("List of Beans in the Application:");
        for (String beanName : beanNames) {
            System.out.println(beanName);
        }
    }
}
