package com.screenr.larsdev.screenr.modules.stock.domain.repositories;

import com.screenr.larsdev.screenr.modules.stock.domain.models.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;

@RestResource(exported = true)
public interface StockRepository extends JpaRepository<Stock, Long> {
}
