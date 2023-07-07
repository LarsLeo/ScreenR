package com.screenr.larsdev.screenr.shared.infrastructure.persistence;

import com.screenr.larsdev.screenr.modules.stock.domain.models.Stock;
import com.screenr.larsdev.screenr.modules.stock.domain.repositories.StockRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {
    private final StockRepository stockRepository;

    public DatabaseLoader(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        stockRepository.save(new Stock("A0HGWF"));
        stockRepository.save(new Stock("A3GVVU"));
        stockRepository.save(new Stock("A1JPFU"));

        System.out.println("Loaded ETFs and Stocks into database.");
    }
}
