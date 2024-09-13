import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { icons } from '@/constants';

const SearchInput = ({ value, placeholder, handleChangeText, otherStyles, keyboardType, ...props }: { value: any, placeholder: string, handleChangeText: (text: string) => void, otherStyles: string, keyboardType: string }) => {
    return (
        <View className='w-full h-[60px] px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary flex-row justify-center items-center space-x-4'>
            <TextInput className='flex-1 text-white mt-0.5 font-pregular text-base'
                value={value}
                placeholder={placeholder}
                placeholderTextColor='#7b7b8b'
                onChangeText={handleChangeText}
            />
            <TouchableOpacity>
                <Image source={icons.search}
                    className='w-5 h-5'
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    );
}

export default SearchInput;
