'use client'

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { InfoIcon } from "lucide-react";
import { login } from "@/actions/auth/login.action";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Por favor, introduzca una dirección de correo electrónico válida." })
    .refine((value) => value.trim() !== "", {
      message: "El correo no puede contener solo espacios.",
    }),
  password: z
    .string()
    .min(3, { message: "Por favor, introduzca su contraseña." })
    .refine((value) => value.trim() !== "", {
      message: "La contraseña no puede contener solo espacios.",
    })
});

export const LoginForm = () => {

  const [errorMessage, seterrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    // Reset loading when component mounts
    setLoading(false);
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const resp = await login(values.email, values.password);
    if (!resp.ok) {
      seterrorMessage(resp.message);
      setLoading(false);
      form.reset();
      return;
    }
    window.location.replace("/profile");
  };

  return (
    <div className="h-full w-full flex flex-col sm:items-center justify-center p-3">
      <div className="max-w-[400px] sm:w-[400px] ">
        <h1 className="mb-4 text-3xl font-semibold">Ingresar</h1>
        {/* <p className="mb-4 text-slate-500">Inicia sesion para acceder a tu cuenta</p> */}
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[400px] max-w-full">
          <div className="grid grid-cols-1 gap-4">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Email</FormLabel> */}
                  <FormControl>
                    <Input
                      className="bg-avecGrayInputColor"
                      type="email"
                      placeholder="Introduce tu correo"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Contraseña */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Contraseña</FormLabel> */}
                  <FormControl>
                    <Input
                      className="bg-avecGrayInputColor"
                      type="password"
                      placeholder="Introduce tu contraseña"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Mensaje de error */}
          {errorMessage && (
            <div className="flex flex-row mb-2 gap-1">
              <InfoIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </div>
          )}
          {/* Botón de Ingresar */}
          <Button className="w-full bg-avecBlueColor hover:bg-avecLightBlueColor " disabled={loading}>
            {loading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Ingresando
              </>
            ) : (
              "Ingresar"
            )}
          </Button>
        </form>
      </FormProvider>
      {/* Línea divisoria */}
      {/* <div className="flex items-center my-5 w-full max-w-[600px]">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div> */}
      {/* Botón Crear Cuenta */}
      {/* <Link href="/auth/new-account" className="w-full max-w-[600px] text-center">
        <Button className="w-full bg-[#f4f4f4] text-avecBlueColorDark hover:bg-avecLightBlueColor hover:text-white">
          Crear Cuenta
        </Button>
      </Link> */}
    </div>
  );
};
