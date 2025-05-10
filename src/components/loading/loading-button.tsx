import React from 'react'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

const LoadingButton = () => {
        return (
                <Button variant={'default'} className='w-full'>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </Button>
        )
}

export default LoadingButton