import { View, Text, Image, useAnimatedValue, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';

const VideoCard = ({ video }: { video: { title: string, thumbnail: string, video: string, creator: { username: string, avatar: string } } }) => {
    const [play, setPlay] = useState(false)
    const { title, creator, thumbnail } = video;

    return (
        <View className='flex-col items-center px-4 mb-14'>
            <View className='flex-row gap-3 items-start'>
                <View className='justify-center items-center flex-row flex-1'>
                    <View className='w-[45px] h-[45px] justify-center items-center border border-secondary rounded-lg p-0.5'>
                        <Image source={{ uri: creator?.avatar }}
                            className='w-full h-full rounded-lg'
                            resizeMode='cover'
                        />
                    </View>
                    <View className='justify-center flex-1 ml-3 gap-y-1'>
                        <Text className='font-psemibold text-sm text-white' numberOfLines={1}>{title}</Text>
                        <Text className='font-pregular text-xs text-gray-100' numberOfLines={1}>{creator?.username}</Text>
                    </View>
                </View>
                <View className='pt-2'>
                    <Image source={icons.menu}
                        className='w-5 h-5'
                        resizeMode='contain'
                    />
                </View>
            </View>
            {play ? (
                <Video
                    source={{ uri: video?.video }}
                    className='w-full h-48 rounded-xl overflow-hidden shadow-lg bg-black shadow-black/40 mt-5'
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay={true} // Ensure the video plays automatically after state change
                    onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
                        if (status.isLoaded) {
                            if (status.didJustFinish) {
                                setPlay(false); // Stop playing when the video finishes
                            }
                        }
                    }}
                />
            ) : (
                <TouchableOpacity activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                    className='w-full h-48 rounded-xl mt-3 relative justify-center items-center'
                >
                    <Image source={{ uri: thumbnail }}
                        className='w-full h-full rounded-xl mt-3'
                        resizeMode='cover'
                    />
                    <Image source={icons.play}
                        className='w-12 h-12 absolute'
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default VideoCard