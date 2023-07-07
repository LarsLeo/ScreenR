package com.screenr.larsdev.screenr.shared.application;

import com.screenr.larsdev.screenr.modules.stock.domain.models.Stock;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.ExposureConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Component
public class SpringDataRestCustomization implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        config.exposeIdsFor(Stock.class);
        ExposureConfiguration exposureConfiguration = config.getExposureConfiguration();
        exposureConfiguration.forDomainType(Stock.class).withItemExposure((metadata, httpMethods) ->
          httpMethods.disable(HttpMethod.DELETE));
    }
}
