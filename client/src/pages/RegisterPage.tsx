import { PasswordInput } from '@/components/Password-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { MailIcon, User2Icon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Email must be a valid email",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

function RegisterPage() {
  const { toast } = useToast()
  const navigate = useNavigate();
  const [registerLoading, setRegisterLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setRegisterLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/users/signup`, values
      )
      if (res.data.success) {
        navigate('/login')
        toast({
          title: res.data.message,
          description: "Please login with the latest credentials",
        })
        setRegisterLoading(false)
      }
      else {
        toast({
          variant: "destructive",
          title: res.data.message,
          description: "Please register again with new credentials",
        })
        setRegisterLoading(false)
      }
    } catch (error) {
      console.log(error)
      setRegisterLoading(false)
    }
  }

  return (

    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 h-auto">
        <CardHeader >
          <CardTitle className='text-3xl'>Sign up👋🏻</CardTitle>
          <CardDescription>Enter your details and register</CardDescription>
        </CardHeader>
        <CardContent>
          <Form { ...form } >
            <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-8">
              <FormField
                control={ form.control }
                name="name"
                render={ ({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" { ...field } suffix={<User2Icon/>}/>
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                ) }
              />
              <FormField
                control={ form.control }
                name="email"
                render={ ({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@gmail.com" { ...field } type='email' suffix={<MailIcon/>} />
                    </FormControl>
                    <FormDescription>
                      This is your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                ) }
              />
              <FormField
                control={ form.control }
                name="password"
                
                render={ ({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="@#$%^&*#%" { ...field } />
                    </FormControl>
                    <FormDescription>
                      This is your password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                ) }
              />
              {
                (registerLoading) ? (
                  <Button disabled >
                      <ReloadIcon className="mr-2 h-6 w-6 animate-spin" />
                      Please wait
                    </Button>
                    
                  ) : (
                    <Button type="submit">Register</Button>
                  )
              }
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Link className='underline' to={ "/login" }>Already a user? Login here !!!</Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegisterPage;
