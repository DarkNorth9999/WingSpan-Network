import { Button } from "@/components/ui/shadcn/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog"
import { Input } from "@/components/ui/shadcn/input"
import { Label } from "@/components/ui/shadcn/label"
import axiosInstance from "@/utils/axios"

export default function SubscribeDialog({flight_id}) {

  const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const email = formData.get('email') === 'on'; 
      const phone_number = formData.get('phone_number') === 'on';

      const subscriptionData = {
          flight_id: flight_id,
          email: email,
          phone_number: phone_number,
      };

      console.log('subscription dfata', subscriptionData)

      try {
          const response = await axiosInstance.post('/subscriptions', subscriptionData);
          if (response.status === 200) {
              console.log('Subscription successful:', response.data);
         
          } else {

              console.error('Subscription failed:', response.data);
          }
      } catch (error) {
          console.error('Error in subscription:', error);

      }
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-[#1ed75fce] hover:bg-[#1ED760]">Subscribe</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Subscribe to receive this flight's updates</DialogTitle>
          <DialogDescription>
            Select how you would like to receive flight updates
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex items-center justify-left gap-5 mt-2">
            <Label htmlFor="emailUpdates" className="text-right">
                Email Updates
            </Label>
            <Input
                type="checkbox"
                id="emailUpdates"
                name="email"
                className="w-[1rem] h-[1rem]"
            />
        </div>
        <div className="flex items-center justify-left gap-[1.6rem]">
            <Label htmlFor="smsUpdates" className="text-right">
                SMS Updates
            </Label>
            <Input
                type="checkbox"
                id="smsUpdates"
                name="phone_number"
                className="w-[1rem] h-[1rem]"
            />
        </div>
        
        

        <DialogFooter>
          <Button className=" bg-black" type="submit">Save changes</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
