
import React, { useState, useEffect } from "react";
import { CloudRain, Droplet, Thermometer, Wind, Calendar, AlertTriangle, BookOpen, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import NavigationBar from "@/components/NavigationBar";

const FarmingAssistance = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    humidity: 65,
    rainfall: 0,
    windSpeed: 8,
  });

  useEffect(() => {
    // Simulate loading weather data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const weatherAlerts = [
    {
      title: "Heavy Rain Expected",
      description: "Heavy rainfall expected in your area in the next 48 hours. Consider postponing any pesticide application.",
      date: "Tomorrow",
      type: "warning"
    },
    {
      title: "Ideal Planting Conditions",
      description: "Next week will provide ideal conditions for planting wheat based on soil moisture and temperature forecasts.",
      date: "Next Week",
      type: "info"
    }
  ];

  const cropAdvisories = [
    {
      crop: "Wheat",
      stage: "Pre-sowing",
      advisory: "Prepare land for wheat sowing. Apply 15kg Nitrogen, 30kg Phosphorus per acre as basal dose.",
      date: "Current"
    },
    {
      crop: "Rice",
      stage: "Harvesting",
      advisory: "The current weather is suitable for harvesting. Ensure proper drying to maintain quality.",
      date: "Current"
    },
    {
      crop: "Potato",
      stage: "Vegetative Growth",
      advisory: "Monitor for late blight disease. Maintain proper irrigation based on soil moisture.",
      date: "Current"
    }
  ];

  const schemes = [
    {
      name: "PM-KISAN",
      description: "Direct income support of ₹6000 per year to eligible farmer families.",
      deadline: "Registration ongoing"
    },
    {
      name: "Soil Health Card",
      description: "Get your soil tested for better crop planning and reduced fertilizer costs.",
      deadline: "Visit nearest Krishi Vigyan Kendra"
    },
    {
      name: "Crop Insurance",
      description: "Pradhan Mantri Fasal Bima Yojana covers crop losses due to natural calamities.",
      deadline: "30 days before sowing season"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-muted/30 pb-16">
      <header className="p-4 bg-app-blue text-white shadow-md">
        <h1 className="text-xl font-bold">Farming Assistance</h1>
        <p className="text-sm mt-1">Weather, crops, and government schemes</p>
      </header>

      <main className="flex-1 p-4">
        <Tabs defaultValue="weather" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="weather">Weather</TabsTrigger>
            <TabsTrigger value="crops">Crop Advice</TabsTrigger>
            <TabsTrigger value="schemes">Schemes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weather" className="space-y-4">
            {isLoading ? (
              <Card className="w-full h-40 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 border-4 border-t-app-blue rounded-full animate-spin mb-2"></div>
                  <p className="text-sm text-gray-500">Loading weather data...</p>
                </div>
              </Card>
            ) : (
              <>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Current Weather</CardTitle>
                    <CardDescription>Updated 30 minutes ago</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Thermometer className="h-8 w-8 text-orange-500 mr-3" />
                        <div>
                          <p className="text-lg font-medium">{weatherData.temperature}°C</p>
                          <p className="text-xs text-gray-500">Temperature</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Droplet className="h-8 w-8 text-blue-500 mr-3" />
                        <div>
                          <p className="text-lg font-medium">{weatherData.humidity}%</p>
                          <p className="text-xs text-gray-500">Humidity</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <CloudRain className="h-8 w-8 text-app-blue mr-3" />
                        <div>
                          <p className="text-lg font-medium">{weatherData.rainfall} mm</p>
                          <p className="text-xs text-gray-500">Rainfall</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Wind className="h-8 w-8 text-gray-500 mr-3" />
                        <div>
                          <p className="text-lg font-medium">{weatherData.windSpeed} km/h</p>
                          <p className="text-xs text-gray-500">Wind Speed</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <h3 className="font-medium text-gray-800">Weather Alerts</h3>
                  {weatherAlerts.map((alert, index) => (
                    <Card key={index} className={alert.type === "warning" ? "border-orange-400" : "border-app-blue"}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">
                            {alert.type === "warning" ? (
                              <div className="flex items-center text-orange-600">
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                {alert.title}
                              </div>
                            ) : (
                              <div className="flex items-center text-app-blue">
                                <CloudRain className="h-4 w-4 mr-1" />
                                {alert.title}
                              </div>
                            )}
                          </CardTitle>
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{alert.date}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">{alert.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="crops" className="space-y-4">
            <h3 className="font-medium text-gray-800">Crop Advisories</h3>
            {cropAdvisories.map((advisory, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{advisory.crop}</CardTitle>
                    <span className="text-xs bg-app-green-light text-app-green px-2 py-0.5 rounded">
                      {advisory.stage}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{advisory.advisory}</p>
                </CardContent>
                <CardFooter className="pt-0 pb-2">
                  <div className="w-full flex items-center justify-between text-xs">
                    <span className="text-gray-500">Current Advisory</span>
                    <Button variant="link" size="sm" className="text-app-blue h-auto p-0">
                      More Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}

            <div className="mt-4 bg-app-green-light rounded-lg p-4">
              <div className="flex items-center mb-2">
                <HelpCircle className="h-5 w-5 text-app-green mr-2" />
                <h3 className="font-medium text-app-green">Need Specific Advice?</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Ask our AI assistant or connect with agricultural experts for personalized crop guidance.
              </p>
              <Button className="w-full bg-app-green">Ask Question</Button>
            </div>
          </TabsContent>

          <TabsContent value="schemes" className="space-y-4">
            <h3 className="font-medium text-gray-800">Government Schemes</h3>
            {schemes.map((scheme, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <BookOpen className="h-4 w-4 mr-1 text-app-blue" />
                    {scheme.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{scheme.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Deadline: {scheme.deadline}</span>
                    <Button variant="outline" size="sm" className="h-8">
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <NavigationBar />
    </div>
  );
};

export default FarmingAssistance;
