import React from 'react'
import { Input, Space } from 'antd'

const { Search } = Input;

const onSearch = value => console.log(value);

const ConfigSearch = props => (
    <div className="site-layout-background">

        <Space direction="vertical">
        <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
        </Space>

    </div>

)

export default ConfigSearch
