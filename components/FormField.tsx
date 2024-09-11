import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { icons } from '@/constants';

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, keyboardType, ...props}: {title: string, value: any, placeholder: string, handleChangeText: (text: string) => void, otherStyles: string, keyboardType: string}) => {
    const [showPassword, setShowPassword] = useState(false)
    
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className='text-base text-gray-100 font-pmedium'>
                {title}
            </Text>
            <View className='w-full h-[60px] px-4 bg-black-100 border-2 border-black-200 rounded-2xl flex-row justify-center items-center'>
                <TextInput className='flex-1 text-white font-psemibold text-base'
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor='#7b7b8b'
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                />

                {title === 'Password' && (
                    <TouchableOpacity onPress={()=> setShowPassword(!showPassword)}>
                        <Image source={!showPassword ? icons.eye : icons.eyeHide} 
                            className='w-6 h-6'
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

export default FormField;
