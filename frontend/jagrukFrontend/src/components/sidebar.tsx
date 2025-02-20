import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Sidebar() {
  return (
    <div className="w-[350px]  shrink-0">
      <Card className="border-0 border-l border-dashed rounded-none shadow-none ">
        <CardHeader>
          <CardTitle className="text-primary">Staff Picks</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {Array.from({ length: 1 }).map((_, i) => (
            <div key={i} className="flex items-start space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Work In Progress</p>
                <p className="text-sm text-muted-foreground">
                  Hope we will get to this soon
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

