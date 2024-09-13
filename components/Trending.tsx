import { icons } from '@/constants';
import React, { useCallback, useRef, useState } from 'react';
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1
    }
};

const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
};

const TrendingList = ({ activeItem, item }: { activeItem: { $id: string }, item: { $id: string, thumbnail: string, video: string } }) => {
    const [play, setPlay] = useState(false);

    return (
        <Animatable.View
            className='mr-5'
            // Trigger animation based on the active item's id comparison
            animation={activeItem?.$id === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {play ? (
                <Video
                    source={{ uri: item.video }}
                    className='w-48 h-72 rounded-xl overflow-hidden shadow-lg bg-black shadow-black/40'
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
                <TouchableOpacity
                    className='relative justify-center items-center'
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)} // Set play to true when pressed
                >
                    <ImageBackground
                        source={{ uri: item.thumbnail }}
                        className='w-48 h-72 rounded-xl overflow-hidden shadow-lg shadow-black/40'
                        resizeMode='cover'
                    />
                    <Image
                        source={icons.play}
                        className='w-12 h-12 absolute'
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )}
        </Animatable.View>
    );
};

const Trending = ({ posts }: { posts: any }) => {
    const [activeItem, setActiveItem] = useState(posts[0]);

    // Memoize the viewableItemChanged function to avoid recreation on every render
    const viewableItemChanged = useCallback(({ viewableItems }: { viewableItems: any[] }) => {
        if (viewableItems.length > 0) {
            const currentViewableItem = viewableItems[0].item; // Get the actual item
            setActiveItem(currentViewableItem); // Set the whole object as activeItem, not just key
        }
    }, []);

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingList activeItem={activeItem} item={item} />
            )}
            horizontal
            onViewableItemsChanged={viewableItemChanged} // Pass memoized function here
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70,
            }}
            contentOffset={{ x: 170, y: 0 }}
            showsHorizontalScrollIndicator={false}
        />
    );
};

export default Trending;
