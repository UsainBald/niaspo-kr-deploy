import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [farms, setFarms] = useState([]);
    const [selectedFarm, setSelectedFarm] = useState(null);
    const [farmDetails, setFarmDetails] = useState(null);
    const [sensors, setSensors] = useState([]);
    const [newFarm, setNewFarm] = useState({ name: "", location: "" });
    const [newSensor, setNewSensor] = useState({ sensorType: "", value: "" });

    useEffect(() => {
        fetchFarms();
    }, []);

    const fetchFarms = () => {
        fetch("/api/farms")
            .then((response) => response.json())
            .then((data) => setFarms(data))
            .catch((error) => console.error("Error fetching farms:", error));
    };

    const fetchFarmDetails = (farmId) => {
        fetch(`/api/farms/${farmId}`)
            .then((response) => response.json())
            .then((data) => setFarmDetails(data))
            .catch((error) => console.error("Error fetching farm details:", error));
    };

    const loadSensors = (farmId) => {
        fetch(`/api/farms/${farmId}/sensors`)
            .then((response) => response.json())
            .then((data) => {
                setSensors(data);
                setSelectedFarm(farms.find((farm) => farm.id === farmId));
                fetchFarmDetails(farmId);
            })
            .catch((error) => console.error("Error fetching sensors:", error));
    };

    const addFarm = (e) => {
        e.preventDefault();
        fetch("/api/farms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newFarm),
        })
            .then(() => {
                setNewFarm({ name: "", location: "" });
                fetchFarms();
            })
            .catch((error) => console.error("Error adding farm:", error));
    };

    const addSensor = (e) => {
        e.preventDefault();
        fetch(`/api/farms/${selectedFarm.id}/sensors`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newSensor),
        })
            .then(() => {
                setNewSensor({ sensorType: "", value: "" });
                loadSensors(selectedFarm.id);
            })
            .catch((error) => console.error("Error adding sensor:", error));
    };

    return (
        <div>
            <h1>Farm Management</h1>
            <div className="container">
                {/* Add Farm Section */}
                <div className="add-section">
                    <h2>Add a New Farm</h2>
                    <form onSubmit={addFarm}>
                        <input
                            type="text"
                            placeholder="Farm Name"
                            value={newFarm.name}
                            onChange={(e) => setNewFarm({ ...newFarm, name: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={newFarm.location}
                            onChange={(e) =>
                                setNewFarm({ ...newFarm, location: e.target.value })
                            }
                            required
                        />
                        <button type="submit">Add Farm</button>
                    </form>
                </div>

                {/* Farms List */}
                <h2>Farms</h2>
                {farms.length === 0 ? (
                    <p>No farms available. Add a new farm to get started.</p>
                ) : (
                    <ul>
                        {farms.map((farm) => (
                            <li key={farm.id} onClick={() => loadSensors(farm.id)}>
                                {farm.name} - {farm.location}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Selected Farm Details and Sensors */}
                {selectedFarm && (
                    <div className="selected-farm">
                        <h2>Details for {selectedFarm.name}</h2>
                        <p>
                            <strong>Farm Name:</strong> {farmDetails?.name}
                        </p>
                        <p>
                            <strong>Location:</strong> {farmDetails?.location}
                        </p>

                        <h2>Sensors for {selectedFarm.name}</h2>

                        {/* Add Sensor Section */}
                        <div className="add-section">
                            <h3>Add a Sensor</h3>
                            <form onSubmit={addSensor}>
                                <input
                                    type="text"
                                    placeholder="Sensor Type"
                                    value={newSensor.sensorType}
                                    onChange={(e) =>
                                        setNewSensor({ ...newSensor, sensorType: e.target.value })
                                    }
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Value"
                                    value={newSensor.value}
                                    onChange={(e) =>
                                        setNewSensor({ ...newSensor, value: e.target.value })
                                    }
                                    required
                                />
                                <button type="submit">Add Sensor</button>
                            </form>
                        </div>

                        {/* List of Sensors */}
                        {sensors.length === 0 ? (
                            <p>No sensors found for this farm.</p>
                        ) : (
                            <ul className="sensor-list">
                                {sensors.map((sensor) => (
                                    <li key={sensor.id}>
                                        <span>{sensor.sensorType}: {sensor.value}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;