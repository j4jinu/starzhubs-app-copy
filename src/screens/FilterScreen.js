import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from 'react';
import {Searchbar} from 'react-native-paper';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Snackbar} from 'react-native-paper';
import {AuthContext} from '../context/authContext';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Checkbox} from 'react-native-paper';
import RangeSlider from 'rn-range-slider';
import Thumb from '../components/slider/Thumb';
import Rail from '../components/slider/Rail';
import RailSelected from '../components/slider/RailSelected';
import Label from '../components/slider/Label';
import Notch from '../components/slider/Notch';
import theme from '../config/theme';

const FilterScreen = (props) => {
  const auth = useContext(AuthContext);
  const [ageToValue, setAgeToValue] = useState(100);
  const [ageFromValue, setAgeFromValue] = useState(0);
  const [heightFromValue, setHeightFromValue] = useState(0);
  const [heightToValue, setHeightToValue] = useState(200);
  const [weightFromValue, setWeightFromValue] = useState(0);
  const [weightToValue, setWeightToValue] = useState(250);

  const [search, setSearch] = useState('');

  const [isDark, setDark] = useState(false);
  const [isBrown, setBrown] = useState(false);
  const [isWheatish, setWheatish] = useState(false);
  const [isFair, setFair] = useState(false);

  const [isFit, setFit] = useState(false);
  const [isAthletic, setAthletic] = useState(false);
  const [isHourglass, setHourglass] = useState(false);
  const [isSlim, setSlim] = useState(false);
  const [isFatty, setFatty] = useState(false);
  const [isAverageBuild, setAverageBuild] = useState(false);

  const [isFemale, setFemale] = useState(false);
  const [isMale, setMale] = useState(false);
  const [isOthers, setOthers] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);
  const [isActor, setActor] = useState(false);
  const [gender, setGender] = useState([]);
  const [skinTone, setSkinTone] = useState([]);
  const [bodyType, setBodyType] = useState([]);

  const [isCategoryOn, setCategoryOn] = useState(false);
  const [isGenderOn, setGenderOn] = useState(false);
  const [isBodyTypeOn, setBodyTypeOn] = useState(false);
  const [isSkinToneOn, setSkinToneOn] = useState(false);

  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await fetch('http://13.232.190.226/api/category/app');
        const resData = await res.json();
        if (resData.success) {
          setCategories(resData.categories);
        } else {
          setCategories([]);
        }
        console.log('Category array: ', categories);
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    getCategory();
  }, []);

  const onSelectedItemsChange = (selectedItem) => {
    console.log(selectedItem);
    setSelectedItems(selectedItem);
    if (selectedItems === []) {
      setCategoryOn(true);
    } else {
      setCategoryOn(false);
    }
  };

  const handleGender = (gnder) => {
    const gndr = [...gender];
    const currentIndex = gender.indexOf(gnder);
    if (currentIndex === -1) {
      gndr.push(gnder);
    } else {
      gndr.splice(currentIndex, 1);
    }
    setGender(gndr);
    if (gender === []) {
      setGenderOn(true);
    } else {
      setGenderOn(false);
    }
  };

  const handleskinTone = (skin) => {
    const skintone = [...skinTone];
    const currentIndex = skinTone.indexOf(skin);
    if (currentIndex === -1) {
      skintone.push(skin);
    } else {
      skintone.splice(currentIndex, 1);
    }
    setSkinTone(skintone);
    if (skinTone === []) {
      setSkinToneOn(true);
    } else {
      setSkinToneOn(false);
    }
  };

  const handleBodyType = (btype) => {
    const bdtype = [...bodyType];
    const currentIndex = bodyType.indexOf(btype);
    if (currentIndex === -1) {
      bdtype.push(btype);
    } else {
      bdtype.splice(currentIndex, 1);
    }
    setBodyType(bdtype);
    if (bodyType === []) {
      setBodyTypeOn(true);
    } else {
      setBodyTypeOn(false);
    }
  };

  const updateSearch = (search) => {
    setSearch(search);
  };

  const doSearch = async () => {
    if (search === '') {
      return alert('Enter a search query');
    }
    const searchRes = await fetch(
      `http://13.232.190.226/api/user/search/u?key=${search}`,
      {
        method: 'PATCH',
      },
    );
    setSearch('');
    const searchData = await searchRes.json();
    if (!searchData.success) {
      setVisible(!visible);
      return;
    }
    props.navigation.navigate('FilterResult', {
      filter: searchData.data.users,
    });
  };

  const handleSubmit = () => {
    if (selectedItems.length === 0) {
      setCategoryOn(true);
      return;
    } else {
      setCategoryOn(false);
    }
    if (gender.length === 0) {
      setGenderOn(true);
      return;
    } else {
      setGenderOn(false);
    }
    selectedItems.forEach((element) => {
      if (
        element === '5f5b2b8e96b2173a30948ac6' ||
        element === '5f5b2b9c96b2173a30948ac7'
      ) {
        if (bodyType.length === 0) {
          setBodyTypeOn(true);
          return;
        } else {
          setBodyTypeOn(false);
        }
        if (skinTone.length === 0) {
          setSkinToneOn(true);
          return;
        } else {
          setSkinToneOn(false);
        }
      }
    });
    const minHeight = heightFromValue;
    const maxHeight = heightToValue;
    const minWeight = weightFromValue;
    const maxWeight = weightToValue;
    const minAge = ageFromValue;
    const maxAge = ageToValue;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token,
      },
      body: JSON.stringify({
        minAge: minAge,
        maxAge: maxAge,
        minHeight: minHeight,
        maxHeight: maxHeight,
        minWeight: minWeight,
        maxWeight: maxWeight,
        talents: selectedItems,
        gender: gender,
        complexion: skinTone,
        bodyType: bodyType,
      }),
    };
    fetch(`http://13.232.190.226/api/talent/filter`, requestOptions)
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.success === true) {
            console.warn(response.data.users);
            props.navigation.navigate('FilterResult', {
              filter: response.data.users,
            });
          } else {
            setVisible(!visible);
          }
          resetFields();
        },
        (error) => {},
      );
  };

  const resetFields = () => {
    setSearch('');
    setAgeToValue(100);
    setAgeFromValue(0);
    setMale(false);
    setFemale(false);
    setOthers(false);
    setSelectedItems([]);
    setGender([]);
    setDark(false);
    setBrown(false);
    setWheatish(false);
    setFair(false);
    setFit(false);
    setAthletic(false);
    setHourglass(false);
    setSlim(false);
    setFatty(false);
    setAverageBuild(false);
    handleAgeValueChange(0, 100);
    // setCategories()
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);

  // Age slider
  const handleAgeValueChange = useCallback((low, high) => {
    setAgeFromValue(low);
    setAgeToValue(high);
  }, []);

  // Weight slider
  const handleWeightValueChange = useCallback((low, high) => {
    setWeightFromValue(low);
    setWeightToValue(high);
  }, []);

  // Height slider
  const handleHeightValueChange = useCallback((low, high) => {
    setHeightFromValue(low);
    setHeightToValue(high);
  }, []);
  return (
    <View style={styles.container}>
      <Snackbar visible={visible} duration={1000} onDismiss={onDismissSnackBar}>
        {' '}
        No Users Found !
      </Snackbar>
      <ScrollView>
        <View>
          <Searchbar
            placeholder="Search Names..."
            onChangeText={updateSearch}
            value={search}
            onSubmitEditing={doSearch}
          />
          <Text
            style={{
              color: 'gray',
              fontWeight: 'bold',
              marginHorizontal: 15,
              marginTop: 10,
              fontSize: 15,
            }}>
            {' '}
            Category
          </Text>

          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <SectionedMultiSelect
              items={categories}
              IconRenderer={Icon}
              uniqueKey="id"
              subKey="children"
              selectText="Select Category"
              showDropDowns={true}
              expandDropDowns
              showCancelButton
              readOnlyHeadings
              readOnlyHeadings={true}
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedItems}
            />
          </View>
          {isCategoryOn && (
            <Text
              style={{
                fontSize: 13,
                color: 'red',
                alignSelf: 'center',
                marginTop: 1,
              }}>
              Select atleast one category
            </Text>
          )}
          <Text
            style={{
              color: 'gray',
              fontWeight: 'bold',
              marginHorizontal: 15,
              marginTop: 10,
              fontSize: 15,
              marginBottom: 8,
            }}>
            Gender
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={isFemale ? styles.active : styles.inactive}
              onPress={() => {
                setFemale(!isFemale);
                handleGender('Female');
              }}>
              <Text style={isFemale ? styles.fontactive : styles.fontinactive}>
                Female
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isMale ? styles.active : styles.inactive}
              onPress={() => {
                setMale(!isMale);
                handleGender('Male');
              }}>
              <Text style={isMale ? styles.fontactive : styles.fontinactive}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isOthers ? styles.active : styles.inactive}
              onPress={() => {
                setOthers(!isOthers);
                handleGender('Transgender');
              }}>
              <Text style={isOthers ? styles.fontactive : styles.fontinactive}>
                Others
              </Text>
            </TouchableOpacity>
          </View>
          {isGenderOn && (
            <Text
              style={{
                fontSize: 13,
                color: 'red',
                alignSelf: 'center',
                marginTop: 1,
              }}>
              Select atleast one gender
            </Text>
          )}
          <Text
            style={{
              color: 'gray',
              fontWeight: 'bold',
              marginHorizontal: 15,
              marginTop: 10,
              fontSize: 15,
              marginBottom: 12,
            }}>
            Age
          </Text>
          <View>
            <RangeSlider
              style={styles.slider}
              min={0}
              max={100}
              step={1}
              floatingLabel
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderLabel={renderLabel}
              renderNotch={renderNotch}
              onValueChanged={handleAgeValueChange}
            />
          </View>
          <Text
            style={{
              color: 'gray',
              fontWeight: 'bold',
              marginHorizontal: 15,
              marginTop: 20,
              fontSize: 15,
              marginBottom: 8,
            }}>
            Height(cm)
          </Text>
          <View>
            <RangeSlider
              style={styles.slider}
              min={0}
              max={200}
              step={1}
              floatingLabel
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderLabel={renderLabel}
              renderNotch={renderNotch}
              onValueChanged={handleHeightValueChange}
            />
          </View>
          <Text
            style={{
              color: 'gray',
              fontWeight: 'bold',
              marginHorizontal: 15,
              marginTop: 20,
              fontSize: 15,
              marginBottom: 12,
            }}>
            Weight(Kg)
          </Text>
          <View>
            <RangeSlider
              style={styles.slider}
              min={0}
              max={250}
              step={1}
              floatingLabel
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderLabel={renderLabel}
              renderNotch={renderNotch}
              onValueChanged={handleWeightValueChange}
            />
          </View>
          <Text
            style={{
              color: 'gray',
              fontWeight: 'bold',
              marginHorizontal: 15,
              marginTop: 20,
              fontSize: 15,
              marginBottom: 8,
            }}>
            Skin Tone
          </Text>
          <View style={{flexDirection: 'row', width: '100%', marginLeft: '5%'}}>
            <View style={{width: '50%'}}>
              <View style={{flexDirection: 'row'}}>
                <Checkbox
                  status={isDark ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setDark(!isDark);
                    handleskinTone('Dark');
                  }}
                  color={theme.$primaryColor}
                />
                <Text
                  style={{
                    color: theme.$primaryColorText,
                    marginLeft: '1%',
                    marginTop: '6%',
                  }}>
                  {' '}
                  Dark
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Checkbox
                  status={isBrown ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setBrown(!isBrown);
                    handleskinTone('Brown');
                  }}
                  color={theme.$primaryColor}
                />
                <Text
                  style={{
                    color: theme.$primaryColorText,
                    marginLeft: '1%',
                    marginTop: '6%',
                  }}>
                  Brown
                </Text>
              </View>
            </View>
            <View style={{width: '50%', marginLeft: '8%'}}>
              <View style={{flexDirection: 'row'}}>
                <Checkbox
                  status={isWheatish ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setWheatish(!isWheatish);
                    handleskinTone('Wheatish');
                  }}
                  color={theme.$primaryColor}
                />
                <Text
                  style={{
                    color: theme.$primaryColorText,
                    marginLeft: '1%',
                    marginTop: '6%',
                  }}>
                  Wheatish
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Checkbox
                  status={isFair ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setFair(!isFair);
                    handleskinTone('Fair');
                  }}
                  color={theme.$primaryColor}
                />
                <Text
                  style={{
                    color: theme.$primaryColorText,
                    marginLeft: '1%',
                    marginTop: '6%',
                  }}>
                  Fair
                </Text>
              </View>
            </View>
          </View>
          {isSkinToneOn && (
            <Text
              style={{
                fontSize: 13,
                color: 'red',
                alignSelf: 'center',
                marginTop: 1,
              }}>
              Select skintone
            </Text>
          )}
          <Text
            style={{
              color: 'gray',
              fontWeight: 'bold',
              marginHorizontal: 15,
              marginTop: 20,
              fontSize: 15,
              marginBottom: 8,
            }}>
            Body Type
          </Text>
          <View style={{flexDirection: 'row', width: '100%', marginLeft: '5%'}}>
            <View style={{width: '50%'}}>
              <View style={{flexDirection: 'row'}}>
                <Checkbox
                  status={isFit ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setFit(!isFit);
                    handleBodyType('Fit');
                  }}
                  color={theme.$primaryColor}
                />
                <Text
                  style={{
                    color: theme.$primaryColorText,
                    marginLeft: '1%',
                    marginTop: '6%',
                  }}>
                  {' '}
                  Fit
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Checkbox
                  status={isHourglass ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setHourglass(!isHourglass);
                    handleBodyType('Hourglass');
                  }}
                  color={theme.$primaryColor}
                />
                <Text
                  style={{
                    color: theme.$primaryColorText,
                    marginLeft: '1%',
                    marginTop: '6%',
                  }}>
                  Hourglass
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Checkbox
                  status={isAverageBuild ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setAverageBuild(!isAverageBuild);
                    handleBodyType('Average Build');
                  }}
                  color={theme.$primaryColor}
                />
                <Text
                  style={{
                    color: theme.$primaryColorText,
                    marginLeft: '1%',
                    marginTop: '6%',
                  }}>
                  {' '}
                  Average Build
                </Text>
              </View>
            </View>
            <View style={{width: '50%', marginLeft: '8%'}}>
              <View style={{flexDirection: 'row'}}>
                <Checkbox
                  status={isSlim ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setSlim(!isSlim);
                    handleBodyType('Slim');
                  }}
                  color={theme.$primaryColor}
                />
                <Text
                  style={{
                    color: theme.$primaryColorText,
                    marginLeft: '1%',
                    marginTop: '6%',
                  }}>
                  Slim
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Checkbox
                  status={isFatty ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setFatty(!isFatty);
                    handleBodyType('Fatty');
                  }}
                  color={theme.$primaryColor}
                />
                <Text
                  style={{
                    color: theme.$primaryColorText,
                    marginLeft: '1%',
                    marginTop: '6%',
                  }}>
                  Fatty
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Checkbox
                  status={isAthletic ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setAthletic(!isAthletic);
                    handleBodyType('Athletic');
                  }}
                  color={theme.$primaryColor}
                />
                <Text
                  style={{
                    color: theme.$primaryColorText,
                    marginLeft: '1%',
                    marginTop: '6%',
                  }}>
                  {' '}
                  Athletic
                </Text>
              </View>
            </View>
          </View>
          {isBodyTypeOn && (
            <Text
              style={{
                fontSize: 13,
                color: 'red',
                alignSelf: 'center',
                marginTop: 1,
              }}>
              Select bodytype
            </Text>
          )}
          <View style={{width: '100%', alignItems: 'center', marginTop: '5%'}}>
            <TouchableOpacity
              style={styles.filterbutton}
              onPress={handleSubmit}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Apply Filter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  active: {
    alignItems: 'center',
    backgroundColor: theme.$primaryColor,
    padding: 10,
    width: '33.333333%',
    marginHorizontal: 1,
  },
  inactive: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    width: '33.333333%',
    marginHorizontal: 1,
    borderColor: theme.$primaryColor,
  },
  filterbutton: {
    alignItems: 'center',
    backgroundColor: theme.$primaryColor,
    padding: 10,
    marginBottom: '10%',
    width: '90%',
    borderRadius: 8,
    alignSelf: 'center',
  },
  fontactive: {
    color: 'white',
  },
  fontinactive: {
    color: theme.$primaryColor,
  },
  slider: {
    marginHorizontal: 15,
  },
});

export default FilterScreen;
