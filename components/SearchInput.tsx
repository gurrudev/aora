import React, { useState } from 'react';
import { icons } from '@/constants';
import { router, usePathname } from 'expo-router';
import { 
    TextInput, 
    TouchableOpacity, 
    View, 
    Image, 
    Alert 
} from 'react-native';

const SearchInput = ({ initialQuery }: { initialQuery: string }) => {
    const pathname = usePathname()
    const [query, setQuery] = useState(initialQuery)

    return (
        <View className='w-full h-[60px] px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary flex-row justify-center items-center space-x-4'>
            <TextInput className='flex-1 text-white mt-0.5 font-pregular text-base'
                value={query}
                placeholder={'Search for a video'}
                placeholderTextColor='#cdcde0'
                onChangeText={(e) => setQuery(e)}
            />
            <TouchableOpacity onPress={() => {
                if (!query) {
                    return Alert.alert(
                        'Missing query',
                        'Please input something to search results across database'
                    )
                }
                if (pathname.startsWith('/search')) router.setParams({ query })
                else router.push(`/search/${query}`)
            }}>
                <Image source={icons.search}
                    className='w-5 h-5'
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    );
}

export default SearchInput;
