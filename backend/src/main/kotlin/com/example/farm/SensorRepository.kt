
package com.example.farm

import org.springframework.data.jpa.repository.JpaRepository

interface SensorRepository : JpaRepository<Sensor, Long> {
    fun findByFarmId(farmId: Long): List<Sensor>
}
