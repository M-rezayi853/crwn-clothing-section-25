import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
// import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

// import WithSpinner from '../../components/with-spinner/with-spinner';

// import './shop.scss';
import { ShopPageContainer } from './shop.styles';


// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);


// const Shop = ({ match, isCollectionsFetching, fetchcollectionsStartAsync, isCollectionsLoaded }) => {
const Shop = ({ match, fetchCollectionsStart }) => {


    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);


    return (
        <ShopPageContainer>
            <Route 
                exact 
                path={`${match.path}`} 
                // render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionsFetching} {...props} />}
                component={CollectionsOverviewContainer}
            />
            <Route 
                path={`${match.path}/:collectionId`} 
                // render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />} 
                component={CollectionPageContainer}
            />
        </ShopPageContainer>
    );
};

// const mapStateToProps = createStructuredSelector({
//     isCollectionsFetching: selectIsCollectionFetching,
//     isCollectionsLoaded: selectIsCollectionsLoaded
// });

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => (dispatch(fetchCollectionsStart()))
});


// export default connect(mapStateToProps ,mapDispatchToProps)(Shop);
export default connect(null ,mapDispatchToProps)(Shop);