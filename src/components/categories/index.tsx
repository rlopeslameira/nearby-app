import { View, Text, FlatList } from 'react-native'
import {styles} from './styles'
import { Category } from '../category'

export type CategoryProps = {
    id: string;
    name: string;
}[]

type Props = {
    data: CategoryProps;
    selected: string;
    onSelect: (id: string) => void;
}

export function Categories({data, selected, onSelect}: Props) {

    return (
        <FlatList 
            data={data}
            renderItem={({item}) => (
                <Category name={item.name} iconId={item.id} onPress={()=> onSelect(item.id)} isSelected={item.id === selected}/>
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.content}
            style={styles.container}
        />
    )
}