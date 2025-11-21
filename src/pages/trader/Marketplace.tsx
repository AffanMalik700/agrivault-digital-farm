import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, ShoppingCart } from "lucide-react";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [commodity, setCommodity] = useState("all");
  const [location, setLocation] = useState("all");

  const listings = [
    {
      id: "WR-2024-001",
      crop: "Wheat",
      grade: "Grade A",
      quantity: 50,
      warehouse: "Shakti WDRA Warehouse #12",
      location: "Sonipat, Haryana",
      askingPrice: 2150,
      farmerName: "Ramesh Kumar",
    },
    {
      id: "WR-2024-004",
      crop: "Rice",
      grade: "Grade A",
      quantity: 100,
      warehouse: "Green Fields Storage #8",
      location: "Rohtak, Haryana",
      askingPrice: 2900,
      farmerName: "Suresh Patel",
    },
    {
      id: "WR-2024-005",
      crop: "Maize",
      grade: "Grade B",
      quantity: 30,
      warehouse: "Agri-Store #15",
      location: "Jhajjar, Haryana",
      askingPrice: 1680,
      farmerName: "Vikas Singh",
    },
    {
      id: "WR-2024-006",
      crop: "Wheat",
      grade: "Grade A",
      quantity: 75,
      warehouse: "Shakti WDRA Warehouse #12",
      location: "Sonipat, Haryana",
      askingPrice: 2120,
      farmerName: "Amit Sharma",
    },
  ];

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCommodity = commodity === "all" || listing.crop === commodity;
    const matchesLocation = location === "all" || listing.location.includes(location);
    return matchesSearch && matchesCommodity && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground p-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">Trader Marketplace</h1>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
              <Input
                placeholder="Search by crop or farmer"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white text-foreground"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4" />
              <span className="font-semibold">Filters</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <Select value={commodity} onValueChange={setCommodity}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Commodities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Commodities</SelectItem>
                    <SelectItem value="Wheat">Wheat</SelectItem>
                    <SelectItem value="Rice">Rice</SelectItem>
                    <SelectItem value="Maize">Maize</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Sonipat">Sonipat</SelectItem>
                    <SelectItem value="Rohtak">Rohtak</SelectItem>
                    <SelectItem value="Jhajjar">Jhajjar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {filteredListings.length} listings found
          </p>
        </div>

        {/* Listings */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-4 border-b">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold">
                        {listing.crop} - {listing.grade}
                      </h3>
                      <p className="text-sm text-muted-foreground">{listing.farmerName}</p>
                    </div>
                    <Badge className="bg-success text-success-foreground">Available</Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.location}</span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Quantity</span>
                      <p className="font-semibold">{listing.quantity} Quintals</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price/Quintal</span>
                      <p className="font-semibold text-success">₹{listing.askingPrice}</p>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="text-muted-foreground">Warehouse: </span>
                    <span className="font-medium">{listing.warehouse}</span>
                  </div>

                  <div className="bg-primary/5 p-3 rounded-lg">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-muted-foreground">Total Value</span>
                      <span className="text-xl font-bold text-primary">
                        ₹{(listing.askingPrice * listing.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" variant="outline" size="sm" asChild>
                      <Link to={`/farmer/receipts/${listing.id}`}>View Details</Link>
                    </Button>
                    <Button className="flex-1" size="sm">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Buy Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
