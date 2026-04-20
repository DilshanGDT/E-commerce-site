// src/inngest/client.ts
import { Inngest } from "inngest";
import connectDB from "./db";

// create a client to send and recieve events
export const inngest = new Inngest({ id: "quickcart-next" });

// Inngest function to save user data to a DB
export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk'
    },
    {
        event: 'clerk/user.created',
    },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;   // Extract relevant user data from the event
        const userData = {
            _id: id, // Use Clerk's user ID as the _id in our DB
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address, // Assuming the first email is the primary one
            imageUrl: image_url,
        };
        await connectDB(); // Connect to the database
        await User.create(userData); // Save the user data to the database
    }
)

// Inngest function to update user data in the DB
export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    {
        event: 'clerk/user.updated',
    },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;   // Extract relevant user data from the event
        const userData = {
            _id: id, 
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address, 
            imageUrl: image_url,
        };
        await connectDB(); 
        await User.findByIdAndUpdate(id, userData); // Update the user data in the database
    }
);

// Inngest function to delete user data from the DB
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-from-clerk'
    },
    {
        event: 'clerk/user.deleted',
    },
    async ({ event }) => {
        const { id } = event.data; 
        await connectDB(); 
        await User.findByIdAndDelete(id); // Delete the user data from the database
    }
);
