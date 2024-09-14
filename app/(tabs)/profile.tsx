import EmptyState from '@/components/EmptyState';
import InfoBox from '@/components/InfoBox';
import SearchInput from '@/components/SearchInput';
import VideoCard from '@/components/VideoCard';
import { icons } from '@/constants';
import { useGlobalContext } from '@/context/GlobalProvider';
import { getUserPosts, searchPosts, signOut } from '@/lib/appwrite';
import { useAppwrite } from '@/lib/useAppwrite';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext() as any
    const { data: posts } = useAppwrite(() => getUserPosts(user?.$id)) as any

    const logout = async () => {
        await signOut()
        setUser(null)
        setIsLoggedIn(false)
        router.replace('/sign-in')
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => <VideoCard video={item} />}
                ListHeaderComponent={() => (
                    <View className=" w-full justify-center items-center mt-6 mb-12 px-4">
                        <TouchableOpacity className='w-full items-end mb-10'
                            onPress={logout}
                        >
                            <Image source={icons.logout}
                                className='w-5 h-6'
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                        <View className='w-16 h-16 justify-center items-center border rounded-lg border-secondary'>
                            <Image source={{ uri: user?.avatar }}
                                className='w-[90%] h-[90%] rounded'
                                resizeMode='contain'
                            />
                        </View>
                        <InfoBox title={user?.username}
                            subtitle=''
                            containerStyles='mt-5'
                            titleStyles='text-2xl'
                        />
                        <View className='flex-row'>
                            <InfoBox title={posts.length || 0}
                                subtitle='Posts'
                                containerStyles='mr-10'
                                titleStyles='text-xl'
                            />
                            <InfoBox title={'1.2k'}
                                subtitle='Followers'
                                containerStyles=''
                                titleStyles='text-xl'
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subtitle="Be the first one to upload the video"
                    />
                )}
            />
            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
};

export default Profile;