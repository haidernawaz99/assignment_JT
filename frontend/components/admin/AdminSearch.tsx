import React from "react";
import { Input, Col, Typography, Select, Switch, Row } from "antd";
import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import Router, { useRouter } from "next/router";
import { SearchBarQuery } from "../../interfaces/searchBarQuery";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material/styles";

const { Paragraph } = Typography;
const { Option } = Select;
const { Search } = Input;

const AdminSearch = ({
  setSearch,
  categoryEnabled,
  searchBarOption,
  setSearchBarOption,
  globalSearch,
  enableLocalSearch,
  onSwitchChange,
}) => {
  return (
    <Row>
      <Col xs={24}>
        <Input.Group compact>
          <Select
            defaultValue={categoryEnabled ? "Category" : "Position"}
            onChange={(value: string) => {
              setSearch((prevState: SearchBarQuery) => ({
                ...prevState,
                option: value,
              }));
              setSearchBarOption(value); // seperate state for global search
            }}
          >
            <Option disabled={!categoryEnabled} value="Category">
              Category
            </Option>
            <Option value="Position">Position</Option>
            <Option value="Location">Location</Option>
            <Option value="Company">Company</Option>
          </Select>

          <Search
            placeholder="Live Search"
            onSearch={(value: string) => {
              if (globalSearch) {
                Router.push(
                  `/admin/search/${searchBarOption.toLowerCase()}/${value}`
                );
              } else {
                setSearch((prevState: SearchBarQuery) => ({
                  ...prevState,
                  text: value,
                }));
              }
              //means perform global search
            }}
            style={{ width: "64%" }}
            enterButton
          />
        </Input.Group>
      </Col>

      {enableLocalSearch && (
        <Paragraph>
          Perform Global Search:{" "}
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
            onChange={onSwitchChange}
            title="Perform Global Search?"
          />
        </Paragraph>
      )}
    </Row>
  );
};

export default AdminSearch;
