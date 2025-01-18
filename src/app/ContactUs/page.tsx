"use client";
import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { GrTrophy } from "react-icons/gr";
import { BsCheckCircle } from "react-icons/bs";
import { MdSupportAgent } from "react-icons/md";
import Styles from "../../styles/ContactUs.module.css";
import "../../app/globals.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object(
  {
    YourName: z.string().min(3, {
      message: "Your name must contain atleast 3 characters"
    }).max(20,  {
      message: "Your name is limited to 20 characters only"
    }),

    Email: z.string().email({message: "Invalid Email Address"}),

    Subject: z.string().optional(),

    Message: z.string().max(500, {message: "Your message is limited to 500 characters only"})
  }
);
type formType = z.infer<typeof formSchema>;

const ContactUs = () => {
  // 1. Define your form.
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: formType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className={Styles.containor}>
      <div className={Styles.maindiv}>
        <div className={Styles.topitems}>
          <h1>Get In Touch With Us</h1>
          <p>
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
            Not Hesitate!
          </p>
        </div>
        <div className={Styles.belowitems}>
          <div className={Styles.leftdiv}>
            <div className={Styles.leftitems}>
              <i>
                <IoLocationSharp />
              </i>
              <div className={Styles.two}>
                <h2>Address</h2>
                <p>
                  236 5th SE Avenue,
                  <br /> New York NY10000,
                  <br /> United States
                </p>
              </div>
            </div>
            <div className={Styles.leftitems}>
              <i>
                <FaPhoneAlt />
              </i>
              <div className={Styles.two}>
                <h2>Phone</h2>
                <p>
                  Mobile: +(84) 546-6789 <br />
                  Hotline: +(84) 456-6789
                </p>
              </div>
            </div>
            <div className={Styles.leftitems}>
              <i>
                <FaClock />
              </i>
              <div className={Styles.two}>
                <h2>Working Hours</h2>
                <p>
                  Monday-Friday: 9:00 - 22:00 <br />
                  Saturday-Sunday: 9:00 - 21:00
                </p>
              </div>
            </div>
          </div>

          <div className={Styles.rightdiv}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className={Styles.labinput}>


                  <FormField
                    control={form.control}
                    name="YourName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold mb-4"

                        >Your Name</FormLabel>
                        <FormControl>
                          <Input className="w-full p-2.5 border border-gray-300 rounded-md text-sm mb-4"

                            placeholder="Abc" {...field} />
                        </FormControl>
                          <FormMessage />
                      </FormItem>
                    )}
                  />


                </div>
                <div className={Styles.labinput}>

                <FormField
                    control={form.control}
                    name= "Email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold mb-4"
                        >Email Address</FormLabel>
                        <FormControl>
                          <Input className="w-full p-2.5 border border-gray-300 rounded-md text-sm mb-4"

                            placeholder="ABC@def.com" {...field} />
                        </FormControl>
                          <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>
                <div className={Styles.labinput}>

                <FormField
                    control={form.control}
                    name= "Subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold mb-4"
                        >Subject</FormLabel>
                        <FormControl>
                          <Input className="w-full p-2.5 border border-gray-300 rounded-md text-sm mb-4"

                            placeholder="This is optional" {...field} />
                        </FormControl>
                          <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>
                <div className={Styles.labinput}>

                <FormField
                    control={form.control}
                    name= "Message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold mb-4"
                        >Message</FormLabel>
                        <FormControl>
                          <Input className="w-full p-2.5 border border-gray-300 rounded-md text-sm mb-4 resize-none"

                            placeholder="Hi! I'd like to ask about" {...field} />
                        </FormControl>
                          <FormMessage />
                      </FormItem>
                    )}
                  />


                </div>
                <Button type="submit" className="w-full max-w-[200px] p-2.5 bg-[#029fae] text-white text-base font-bold rounded-md cursor-pointer mt-2.5"
                >Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <div className={Styles.belowthree}>
        <div className={Styles.threeitems}>
          <div className={Styles.itm}>
            <i>
              <GrTrophy />
            </i>
            <div className={Styles.twin}>
              <h2>HIGH QUALITY</h2>
              <p>Crafted from top materials</p>
            </div>
          </div>

          <div className={Styles.itm}>
            <i>
              <BsCheckCircle />
            </i>
            <div className={Styles.twin}>
              <h2>Warranty Protection</h2>
              <p>Over 2 years</p>
            </div>
          </div>

          <div className={Styles.itm}>
            <i>
              <MdSupportAgent />
            </i>
            <div className={Styles.twin}>
              <h2>24/7 Support</h2>
              <p>Dedicated support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
