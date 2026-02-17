"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useQuery } from "@apollo/client/react"
import { DASHBOARD_QUERY } from "@/graphql/product"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface DashboardData {
  dashboard: {
    totalProducts: number
    totalQuantity: number
    totalInventoryValue: number
  }
}




export default function DashboardPage() {
  const { data, loading, error } = useQuery<DashboardData>(DASHBOARD_QUERY)

  if (loading) {
    return <div className="p-6 text-center">Loading dashboard...</div>
  }

  if (error) {
    return <div className="p-6 text-red-500">Error loading dashboard</div>
  }

  return (
    <div className="relative p-4 sm:p-6 space-y-6">
      <Button variant="outline" size="sm" className="absolute" onClick={() => window.history.back()}>
      <ArrowLeft />
      </Button>
      <h1 className="text-xl sm:text-2xl font-semibold text-center">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">
              {data?.dashboard.totalProducts}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Quantity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">
              {data?.dashboard.totalQuantity}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Inventory Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">
              ₹{" "}
              {data?.dashboard.totalInventoryValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
