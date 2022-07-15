import { Container } from 'react-bootstrap'
import CardStatistic from '../components/CardStatistic'

export default function AllStatistics() {
    return (
        <div className='mt-3'>
            <Container>
                <div className='row'>
                    <div className='col-md-6'>
                        <CardStatistic />
                        <div className='mt-5'>
                            <CardStatistic />
                        </div>

                    </div>
                    <div className='col-md-6'>
                        <CardStatistic />
                        <div className='mt-5'>
                            <CardStatistic />
                        </div>
                    </div>
                </div>

            </Container>
        </div>
    )
}