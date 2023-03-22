import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Alert,
  Button,
  Form,
  InputNumber,
  Typography,
  Input,
  Popconfirm,
  Table,
} from "antd";
import AdminLayout from "../../../components/admin/AdminLayout";
import client from "../../../graphql/apollo-client";
const { Title, Paragraph, Text } = Typography;
import React, { useContext, useEffect, useRef, useState } from "react";
import type { FormInstance } from "antd/es/form";
import styles from "./categories.module.css";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Category {
  key: string;
  category: string;
}

const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      categories
    }
  }
`;

const SET_CATEGORIES = gql`
  mutation setCategories($input: SetCategoriesInputParams!) {
    setCategories(input: $input) {
      categories
    }
  }
`;

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  // record: Category;
  record: string;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Categories = () => {
  const [uploaded, setUploaded] = useState(false);
  const [form] = Form.useForm();
  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery(GET_CATEGORIES);
  const [
    setCategories,
    { data: setCategoryData, loading: setCategoryLoading },
  ] = useMutation(SET_CATEGORIES);
  const [data, setData] = useState(null);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    // if (categoryData?.getCategories) {
    //   // add key to each category object
    //   const categoriesWithKeys = categoryData.getCategories.categories.map(
    //     (category: object, index: number) => {
    //       return {
    //         key: index,
    //         ...category,
    //       };
    //     }
    //   );

    //   console.log(categoriesWithKeys);
    //   setData(categoriesWithKeys);
    // }
    setData(categoryData?.getCategories?.categories);
  }, [categoryLoading]);

  const isEditing = (record: Category) => record.key === editingKey;

  const edit = (record: Partial<Category> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Category;

      const newData = [...data];
      const index = newData.findIndex((Category) => key === Category.key);
      if (index > -1) {
        const Category = newData[index];
        newData.splice(index, 1, {
          ...Category,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns: any = [
    {
      title: "Category",
      align: "center",
      dataIndex: "category",

      editable: true,
    },

    {
      title: "Operation",
      align: "center",

      render: (_: any, record: Category) => {
        const editable = isEditing(record);
        return (
          <div
            style={
              {
                // display: "flex",
                // flexDirection: "row",
              }
            }
          >
            {editable ? (
              <>
                <Button
                  onClick={() => save(record.key)}
                  style={{ marginRight: 8 }}
                >
                  Save
                </Button>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <Button danger>Cancel</Button>
                </Popconfirm>
              </>
            ) : (
              <>
                <Button
                  disabled={editingKey !== ""}
                  onClick={() => edit(record)}
                  style={{ marginRight: 8 }}
                >
                  Edit
                </Button>
                <span>
                  <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => handleDelete(record.key)}
                  >
                    <Button style={{ marginRight: 8 }} danger>
                      Delete
                    </Button>
                  </Popconfirm>
                </span>
              </>
            )}
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Category) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAdd = () => {
    const newData: Category = {
      key: `${data.length + 1}`,
      category: "Enter New Category Name",
      // setCount(count + 1);
    };
    setData([...data, newData]);
  };

  const handleDelete = (key: React.Key) => {
    const newData = data.filter((Category) => Category.key !== key);
    setData(newData);
  };

  const handleSave = () => {
    setCategories({
      variables: {
        categories: data,
      },
    });
  };

  return (
    <AdminLayout title="Configure Categories" enableLocalSearch={false}>
      <Title level={3} style={{ marginBottom: 0 }}>
        Configure Categories
      </Title>
      {/* {uploaded && (
        <Alert
          message="Updated Categories"
          closable
          description={
            <div>
              Successfully Updated Categories Period to{" "}
              <strong> {form.getFieldValue("extensionPeriod")}</strong> days.
            </div>
          }
          type="success"
          showIcon
        />
      )} */}

      <br />

      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>

      <div
        style={
          {
            // display: "flex",
            // justifyContent: "center",
            // alignContent: "center",
            // width: "100%",
            // marginLeft: "auto",
            // marginRight: "auto",
          }
        }
      >
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            // rowClassName={"editable-row"}
            rowClassName={() => styles.editablerow}
            pagination={false}
            tableLayout="fixed"
          />
        </Form>
      </div>

      <Button onClick={handleSave} type="primary" style={{ marginBottom: 16 }}>
        Save Changes
      </Button>
    </AdminLayout>
  );
};
export default Categories;
