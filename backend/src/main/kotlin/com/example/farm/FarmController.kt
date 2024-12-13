
package com.example.farm

import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/farms")
class FarmController(
    private val farmRepository: FarmRepository,
    private val sensorRepository: SensorRepository
) {

    @GetMapping
    fun getFarms(): List<Farm> = farmRepository.findAll()

    @PostMapping
    fun createFarm(@RequestBody farm: Farm): Farm = farmRepository.save(farm)

    @GetMapping("/{id}")
    fun getFarm(@PathVariable id: Long): Farm = farmRepository.findById(id).orElseThrow()

    @GetMapping("/{id}/sensors")
    fun getSensorsByFarm(@PathVariable id: Long): List<Sensor> = sensorRepository.findByFarmId(id)

    @PostMapping("/{id}/sensors")
    fun addSensor(@PathVariable id: Long, @RequestBody sensor: Sensor): Sensor =
        sensorRepository.save(sensor.copy(farmId = id))
}
