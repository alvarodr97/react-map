import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ErrorGeolocation() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="w-[550px]">
        <CardHeader>
          <CardTitle className="flex justify-center self-center">
            Permisos rechazados
          </CardTitle>
          <CardDescription className="flex justify-center self-center">
            Geolocalización necesaria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Para poder continuar, acéptalos y recarga la página.</p>
        </CardContent>
        {/* TODO: Añadir imagen para saber como aceptar los permisos */}
      </Card>
    </div>
  );
}
