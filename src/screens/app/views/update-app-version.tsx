import RNApkInstaller from '@dominicvonk/react-native-apk-installer';
import {
  Button,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from '@gluestack-ui/themed';
import { useRef, useState } from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import DeviceInfo from 'react-native-device-info';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';
import Config from 'src/config';
import { useAppSelector } from 'src/hooks';
import { v4 as uuidV4 } from 'uuid';

export const UpdateAppVersion = () => {
  const [focusedElement, setFocusedElement] = useState<string | null>(null);
  const currentAppVersion = DeviceInfo.getVersion();
  const latestAppVersion = useAppSelector(s => s.app.store.version);
  const url = useAppSelector(s => s.app.store.url);
  const appUrl = Config.STORAGE_BASE_URL + '/' + url;
  const [showModal, setShowModal] = useState(true);
  const [percent, setPercent] = useState<number>(0);

  const ref = useRef(null);

  if (currentAppVersion === latestAppVersion) {
    return null;
  }

  const handlePress = async () => {
    const filePath = RNFS.DocumentDirectoryPath + '/' + uuidV4() + '.apk';
    const download = RNFS.downloadFile({
      fromUrl: appUrl,
      toFile: filePath,
      progress: res => {
        const currentPercent = +(res.bytesWritten / res.contentLength).toFixed(2) * 100;
        setPercent(currentPercent);
      },
      progressDivider: 1,
    });
    download.promise
      .then(result => {
        if (result.statusCode >= 400) {
          Toast.show({ text1: 'Lỗi khi tải, vui lòng thử lại' });
          return;
        }
        RNApkInstaller.install(filePath);
      })
      .finally(() => {
        setPercent(0);
      });
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(showModal);
      }}
      finalFocusRef={ref}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Xview store</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text>Đã có phiên bản mới của Xview store. Bạn có muốn tải về?</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3"
            onPress={() => {
              setShowModal(false);
            }}
            onFocus={() => {
              setFocusedElement('cancel');
            }}
            borderColor={focusedElement === 'cancel' ? '$textDark900' : undefined}
            borderWidth={focusedElement === 'cancel' ? 2 : undefined}
          >
            <ButtonText>Huỷ</ButtonText>
          </Button>
          {percent ? (
            <CircularProgress
              radius={14}
              initialValue={0}
              showProgressValue={false}
              value={percent}
              activeStrokeColor={'#2465FD'}
              activeStrokeSecondaryColor={'#C25AFF'}
            />
          ) : (
            <Button
              size="sm"
              action="positive"
              onPress={handlePress}
              borderColor={focusedElement === 'submit' ? '$textDark900' : undefined}
              borderWidth={focusedElement === 'submit' ? 2 : undefined}
              onFocus={() => {
                setFocusedElement('submit');
              }}
            >
              <ButtonText>Tải về</ButtonText>
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
