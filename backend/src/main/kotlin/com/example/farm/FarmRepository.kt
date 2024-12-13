
package com.example.farm

import org.springframework.data.jpa.repository.JpaRepository

interface FarmRepository : JpaRepository<Farm, Long>
