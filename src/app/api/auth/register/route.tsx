import { RegistrationData } from "@/interfaces/users/User.interface"
import { NextResponse } from "next/server"
import  db  from "@/libs/db";

export async function POST (request: {json: () => Promise<RegistrationData>}){
    const data = await request.json()
    
    const userFound = await db.user.findUnique({
        where:{
            email: data.email
        }
    })

    if(userFound){
        return NextResponse.json({
            message: "User already exists"
        },{
            status: 400
        })
    }
    const newUser = await db.user.create({
        data:{
            username: data.username,
            email: data.email,
            password: data.password,
            updatedAt: new Date(),
        }})
    return NextResponse.json(newUser)
}