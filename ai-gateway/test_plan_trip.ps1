$body = @{
    customer_name = "Rahul Sharma"
    source = "Bengaluru"
    destination = "Tokyo"
    travel_dates = @{
        start = "2026-08-01"
        end = "2026-08-10"
    }
    budget = 300000
    currency = "INR"
    num_travelers = 2
    meal_preference = "Vegetarian"
    passport_number = "A1234567"
    phone = "+91-9876543210"
    email = "rahul@example.com"
    loyalty_id = "FF-123456"
} | ConvertTo-Json -Depth 3

$response = Invoke-RestMethod -Uri http://localhost:8000/plan-trip -Method Post -Body $body -ContentType "application/json"
$response | ConvertTo-Json -Depth 5
