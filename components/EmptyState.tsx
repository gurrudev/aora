import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import CustomButton from './customButton'
import { router } from 'expo-router'

const EmptyState = ({ title, subtitle }: { title: string, subtitle: string }) => {
    return (
        <View className='justify-center items-center px-4'>
            <Image source={images.empty}
                className='w-[270px] h-[215px]'
                resizeMode='contain'
            />
            <Text className='font-psemibold text-xl text-white'>{title}</Text>
            <Text className='text-sm font-pmedium text-gray-100'>{subtitle}</Text>
            <CustomButton
                title='Create Video'
                handlePress={() => router.push('/create')}
                containerStyle='w-full my-5'
                textStyles='' 
                isLoading={false}            
            />
        </View>
    )
}

export default EmptyState