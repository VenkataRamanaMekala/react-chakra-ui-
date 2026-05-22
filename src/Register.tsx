import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";

const RegisterForm: React.FC = () => {
  const toast = useToast();

  const fruitOptions = ["Orange", "Banana", "Grapes"];

  const [showDropdown, setShowDropdown] = useState(false);

  const [fruits, setFruits] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    singleOption: "",
    multiOptions: [] as string[],
    flavor: "",
    favoriteColor: "#000000",
    date: "",
    range: 50,
    quantity: 5,
    file: null as File | null,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        file: e.target.files[0],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    toast({
      title: "Form submitted successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });

    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      singleOption: "",
      multiOptions: [],
      flavor: "",
      favoriteColor: "#000000",
      date: "",
      range: 50,
      quantity: 5,
      file: null,
      message: "",
    });

    setFruits([]);
  };

  return (
    <Flex justify="center" align="center" minH="100vh" bg="gray.100" p={5}>
      <Box
        w="700px"
        bg="white"
        p={6}
        rounded="xl"
        shadow="xl"
        border="2px solid"
        borderColor="blue.400"
      >
        <Box
          bg="cyan.400"
          color="white"
          textAlign="center"
          py={3}
          rounded="md"
          fontSize="2xl"
          fontWeight="bold"
          mb={6}
        >
          Your Website to practice Automation Testing
        </Box>

        <form onSubmit={handleSubmit}>
          <FormControl mb={5}>
            <Flex align="center" gap={5}>
              <FormLabel fontSize="17px" fontWeight="bold" minW="120px" mb={0}>
                First Name:
              </FormLabel>

              <Input
                w="250px"
                h="50px"
                fontSize="17px"
                borderRadius="12px"
                placeholder="Enter First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Flex>
          </FormControl>

          <FormControl mb={5}>
            <Flex align="center" gap={5}>
              <FormLabel fontSize="17px" fontWeight="bold" minW="120px" mb={0}>
                Last Name:
              </FormLabel>

              <Input
                w="250px"
                h="50px"
                fontSize="17px"
                borderRadius="12px"
                placeholder="Enter Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Flex>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Gender:</FormLabel>

            <RadioGroup
              value={formData.gender}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  gender: value,
                })
              }
            >
              <Stack spacing={3}>
                <Radio value="Male">Male:</Radio>

                <Radio value="Female">Female</Radio>

                <Radio value="Others">Others</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Choose an option:</FormLabel>

            <Select
              w="29%"
              name="singleOption"
              value={formData.singleOption}
              onChange={handleChange}
            >
              <option value="">Select Option</option>

              <option value="Option 1">Option 1</option>

              <option value="Option 2">Option 2</option>

              <option value="Option 3">Option 3</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Multiple Options:</FormLabel>

            <CheckboxGroup>
              <Stack>
                <Checkbox value="A">Option A</Checkbox>

                <Checkbox value="B">Option B</Checkbox>

                <Checkbox value="C">Option C</Checkbox>
              </Stack>
            </CheckboxGroup>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Start typing and it will guess:</FormLabel>

            <Input
              list="flavors"
              w="50%"
              name="flavor"
              value={formData.flavor}
              onChange={handleChange}
              placeholder="Type flavor..."
            />

            <datalist id="flavors">
              <option value="Strawberry" />
              <option value="Vanilla" />
              <option value="Mint" />
              <option value="Banana" />
            </datalist>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Select Fruits:</FormLabel>

            <Box position="relative" w="50%">
              <Button
                w="100%"
                h="auto"
                minH="45px"
                variant="outline"
                justifyContent="flex-start"
                flexWrap="wrap"
                gap={2}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {fruits.length > 0 ? (
                  fruits.map((fruit, index) => (
                    <Tag key={fruit} borderRadius="full">
                      <TagLabel>{fruit}</TagLabel>

                      <TagCloseButton
                        onClick={(e) => {
                          e.stopPropagation();

                          setFruits(fruits.filter((_, i) => i !== index));
                        }}
                      />
                    </Tag>
                  ))
                ) : (
                  <Text color="gray.500">Select fruits</Text>
                )}
              </Button>

              {showDropdown && (
                <Box
                  position="absolute"
                  w="100%"
                  bg="white"
                  borderWidth="1px"
                  rounded="md"
                  shadow="md"
                  mt={1}
                  zIndex={1000}
                >
                  {fruitOptions.map((fruit) => (
                    <Box
                      key={fruit}
                      px={3}
                      py={2}
                      cursor="pointer"
                      _hover={{
                        bg: "gray.100",
                      }}
                      onClick={() => {
                        if (!fruits.includes(fruit)) {
                          setFruits([...fruits, fruit]);
                        }

                        setShowDropdown(false);
                      }}
                    >
                      {fruit}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </FormControl>

          <FormControl mb={4}>
            <HStack>
              <FormLabel mb={0}>Favorite Color:</FormLabel>

              <Input
                type="color"
                w="70px"
                p={1}
                name="favoriteColor"
                value={formData.favoriteColor}
                onChange={handleChange}
              />
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <HStack>
              <FormLabel mb={0}>Select Date:</FormLabel>

              <Input
                type="date"
                w="28%"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Scroll Range:</FormLabel>

            <HStack w="25%">
              <Slider
                value={formData.range}
                min={0}
                max={100}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    range: value,
                  })
                }
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>

                <SliderThumb />
              </Slider>

              <Text>{formData.range}</Text>
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Select Quantity:</FormLabel>

            <HStack>
              <Button
                onClick={() =>
                  setFormData({
                    ...formData,
                    quantity: formData.quantity > 1 ? formData.quantity - 1 : 1,
                  })
                }
              >
                -1
              </Button>

              <Text fontSize="xl">{formData.quantity}</Text>

              <Button
                onClick={() =>
                  setFormData({
                    ...formData,
                    quantity:
                      formData.quantity < 10 ? formData.quantity + 1 : 10,
                  })
                }
              >
                +1
              </Button>
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize="17px" fontWeight="bold" mb={3}>
              Select File:
            </FormLabel>

            <HStack spacing={4}>
              <Button
                as="label"
                htmlFor="fileUpload"
                border="1px solid"
                borderColor="gray.300"
                bg="white"
                cursor="pointer"
                px={5}
              >
                Choose File
              </Button>

              <Input
                id="fileUpload"
                type="file"
                display="none"
                onChange={handleFileChange}
              />

              <Text color="gray.500">
                {formData.file ? formData.file.name : "No file chosen"}
              </Text>
            </HStack>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Long Message:</FormLabel>

            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write something..."
            />
          </FormControl>

          <Flex justify="flex-end" mt={5}>
            <Button colorScheme="blue" type="submit" w="120px">
              Submit
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default RegisterForm;
