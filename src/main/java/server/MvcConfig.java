package server;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/home").setViewName("home");
        registry.addViewController("/").setViewName("home");
        registry.addViewController("/ide/").setViewName("index");
        registry.addViewController("/ide/new").setViewName("index");
        registry.addViewController("/ide/file").setViewName("file");
        registry.addViewController("/help").setViewName("help");
        registry.addViewController("/about").setViewName("about");
    }

}
