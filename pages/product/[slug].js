import { Button, Card, Grid, Link, List, ListItem, Typography } from '@material-ui/core';
import Image from 'next/image';
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout';
import data from '../../utils/data';
import useStyles from '../../utils/styles';

export default function ProductScreen() {
    const router = useRouter();
    const classes = useStyles();
    const {slug} = router.query;
    const product = data.products.find(a => a.slug === slug);
    if(!product){
        return <div>Product Not Found :(</div>
    }

  return (
    <Layout title={product.name} description={product.description}>
        <div className={classes.section}>
            <NextLink href='/' passHref>
            <Link>Back to products</Link>
            </NextLink>
        </div>
        <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
                <Image src={product.image} alt={product.name} width={640} height={640} layout="responsive" />
            </Grid>
            <Grid item md={3} xs={12}>
                <List>
                    <ListItem>
                        <Typography component='h1'>
                        <h1>{product.name}</h1>
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                        Category: {product.category}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                        Brand: {product.brand}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                        Rating: {product.rating} stars (of {product.numReviews} reviews)
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                        Description: {product.description}
                        </Typography>
                    </ListItem>
                </List>
            </Grid>
            <Grid item md={3} xs={12}>
                <Card>
                    <List>
                        <ListItem>
                            <Grid container>
                                <Grid xs={6} item><Typography>Price</Typography></Grid>
                                <Grid xs={6} item><Typography>${product.price}</Typography></Grid>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            <Grid container>
                                <Grid xs={6} item><Typography>Status</Typography></Grid>
                                <Grid xs={6} item><Typography>{product.countInStock>0 ? 'In stock' : 'Unavailabe'}</Typography></Grid>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            <Button fullWidth variant='contained' color='primary'>
Add to Cart
                            </Button>
                        </ListItem>
                    </List>
                </Card>
            </Grid>
        </Grid>
    </Layout>
  )
}
