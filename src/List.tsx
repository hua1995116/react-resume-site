import React, { useState } from 'react';

class DynamicList extends React.Component {
    constructor(props: any) {
        
        super(props)
        this.state = {
            list: []
        }
    }
    addList(item: any) {
        this.state.list.push(item)
        this.setState({
            list: this.state.list
        })
    }
    render() {
        return (
            <>
                {
                    this.props.children(this.state.list, this.addList)
                }
            </>
        )
    }
}




<DynamicList>
{
(list, addList) => {
    list.map(item => {

    })    
}
}
</DynamicList>


// const useDynamicList1 = () => {
//     const [list, setList] = useState([]);

//     const addList = (item) => {
//         setList([
//             ...list,
//             item
//         ])
//     }   
//     return [list, addList];
// }