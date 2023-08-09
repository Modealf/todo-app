import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Post('signup')
    signUp(): string {

        return 'user has been created';
    }


    signIn(){
        
    }

    getUser(){
        
    }

    deleteUser(){
        
    }
    
    updateUser(){
     
    }

}
