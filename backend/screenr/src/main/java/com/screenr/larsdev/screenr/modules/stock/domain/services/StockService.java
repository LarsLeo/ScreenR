package com.screenr.larsdev.screenr.modules.stock.domain.services;

import com.screenr.larsdev.screenr.modules.stock.domain.models.Stock;
import com.screenr.larsdev.screenr.modules.stock.domain.repositories.StockRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {
    private final StockRepository stockRepository;

    public StockService(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    public List<Stock> getStocks() {
        return stockRepository.findAll();
    }
}
