import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false)

  const addGoalHandler = (goal) => {
    setCourseGoals(currentGoals => [...currentGoals, { id: Math.random().toString(), value: goal }]);
    setIsAddMode(false)
  }

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goal.id !== goalId)
    })
  }

  const cancelGoalHandler = () => {
    setIsAddMode(false)
  }

  return (
    <View style={styles.screen}>
      <Button title="Click To Add A Goal" onPress={() => setIsAddMode(true)}/>
      <GoalInput 
        visible={isAddMode} 
        addGoalHandler={addGoalHandler}
        onCancel={cancelGoalHandler}
        />
      <FlatList 
        keyExtractor={(item, index) => item.id }
        data={courseGoals} 
        renderItem={itemData => 
        <GoalItem 
          id={itemData.item.id} 
          onDelete={removeGoalHandler} 
          title={itemData.item.value}/>}/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
